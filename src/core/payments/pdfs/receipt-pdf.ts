/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Content, TDocumentDefinitions } from 'pdfmake/interfaces';
import { format } from 'date-fns';
import { cardinalConverter } from 'italian-numbers';
import apolloClient from '../../../apollo';
import {
  FeeDetailFragment,
  PaymentFilter,
  PaymentPdfFragment,
  PaymentPdfQuery,
  PaymentPdfQueryVariables,
  RecurrenceEnum,
} from '../../../generated/graphql';
import { PAYMENTS_PDF_QUERY, PAYMENT_PDF_QUERY } from '../queries.graphql';
import i18n from '../../../i18n';
import { municipalities, signature as signatureUri } from '../../../constants';
import { dateToYearMonth, toQuantity, isMinor, getSex } from '../../../utils';

const { t } = i18n;

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const defaultColor = '#116B92';

const tableLayout = {
  hLineColor: () => defaultColor,
  vLineColor: () => defaultColor,
};

class PDF {
  payment: PaymentPdfFragment;

  private static styles: TDocumentDefinitions['styles'] = {
    label: {
      color: defaultColor,
    },
    backgroundLabel: {
      background: defaultColor,
      color: 'white',
    },
  };

  constructor(payment: PaymentPdfFragment) {
    this.payment = payment;
  }

  public static async print(paymentId: string, action: 'open' | 'data-url' = 'open'): Promise<string | undefined> {
    const { data, error } = await apolloClient.query<PaymentPdfQuery, PaymentPdfQueryVariables>({
      query: PAYMENT_PDF_QUERY,
      variables: {
        id: paymentId,
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    const pdfDef = new PDF(data.payment).generatePDF();
    const pdfGenerated = pdfMake.createPdf(pdfDef);

    switch (action) {
      case 'data-url':
        return new Promise((resolve) => {
          pdfGenerated.getDataUrl((result) => {
            resolve(result);
          });
        });

      default:
        pdfGenerated.open();
    }

    return undefined;
  }

  public static printFacSimile(fee: FeeDetailFragment) {
    const today = new Date();
    const years = [
      today.getMonth() < 8 ? today.getFullYear() - 1 : today.getFullYear(),
      today.getMonth() < 8 ? today.getFullYear() : today.getFullYear() + 1,
    ];

    const municipalityCodes = Object.keys(municipalities);
    const municipalityCode = municipalityCodes[Math.floor(Math.random() * municipalityCodes.length - 1)];

    const adultPayment: PaymentPdfFragment = {
      counter: Math.floor(Math.random() * 501),
      date: today.getTime(),
      amount: fee.amount,
      ...(fee.recurrence === RecurrenceEnum.ANNUAL && {
        years,
      }),
      ...(fee.recurrence === RecurrenceEnum.MONTHLY && { month: dateToYearMonth(today) }),
      reason: fee.reason.replaceAll('[MESE]', format(today, 'MMMM yyyy')).replaceAll('[ANNO]', years.join(' - ')),
      member: {
        name: 'Nome',
        surname: 'Cognome',
        taxCode: `AAAAAA90A01${municipalityCode}A`,
        birthday: new Date(1990, 0, 1).getTime(),
        parent: {
          name: 'Nome',
          surname: 'Cognome',
          taxCode: `AAAAAA90A01${municipalityCode}A`,
        },
      },
    };

    const minorPayment: PaymentPdfFragment = {
      counter: Math.floor(Math.random() * 501),
      date: today.getTime(),
      amount: fee.amount,
      ...(fee.recurrence === RecurrenceEnum.ANNUAL && {
        years,
      }),
      ...(fee.recurrence === RecurrenceEnum.MONTHLY && { month: dateToYearMonth(today) }),
      reason: fee.reason.replaceAll('[MESE]', format(today, 'MMMM yyyy')).replaceAll('[ANNO]', years.join(' - ')),
      member: {
        name: 'Nome',
        surname: 'Cognome',
        taxCode: `AAAAAA10A01${municipalityCode}A`,
        birthday: new Date(1990, 0, 1).getTime(),
        parent: {
          name: 'Nome',
          surname: 'Cognome',
          taxCode: `AAAAAA90A01${municipalityCode}A`,
        },
      },
    };

    const pdfDef = PDF.generatePDFMultiple([adultPayment, minorPayment]);
    pdfDef.watermark = 'fac-simile';
    const pdfGenerated = pdfMake.createPdf(pdfDef);

    pdfGenerated.open();
  }

  public static async printMultiple(paymentFilter: PaymentFilter) {
    const { data, error } = await apolloClient.query({
      query: PAYMENTS_PDF_QUERY,
      variables: {
        filter: paymentFilter,
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    const {
      payments: { data: payments },
    } = data;

    const pdfDef = PDF.generatePDFMultiple(payments);
    const pdfGenerated = pdfMake.createPdf(pdfDef);

    pdfGenerated.open();
  }

  private generatePDF(): TDocumentDefinitions {
    return {
      info: { title: 'receipt.pdf' },
      content: this.generateContent(),
      styles: PDF.styles,
    };
  }

  private static generatePDFMultiple(payments: PaymentPdfFragment[]): TDocumentDefinitions {
    const content = payments.map((payment: PaymentPdfFragment, index) => {
      const result: Content = {
        table: {
          widths: ['*'],
          dontBreakRows: true,
          body: [
            [
              {
                border: [false, false, false, false],
                stack: new PDF(payment).generateContent(),
              },
            ],
          ],
        },
      };
      if (index < payments.length - 1) {
        return [result, '\n'];
      }
      return result;
    });

    return {
      info: { title: 'receipts.pdf' },
      content,
      pageMargins: [35, 35, 35, 35],
      styles: PDF.styles,
    };
  }

  private generateContent(): Content {
    return [this.getHeader(), this.getMemberInfo(), this.getAmount(), this.getReason(), this.getTaxStampAndSignature()];
  }

  private getHeader(): Content {
    return {
      layout: tableLayout,
      table: {
        widths: ['60%', '40%'],
        body: [
          [
            {
              border: [true, true, true, true],
              alignment: 'center',
              bold: true,
              text: [
                'A.s.d. SCUOLA SAMMARCO\n',
                { text: 'Sede legale: ', italics: true, bold: false },
                'Via Parpaiola, 12/1\n',
                '35011 CAMPODARSEGO (PD)\n',
                'C.F. 92258630281',
              ],
            },
            {
              border: [false, true, true, true],
              stack: [
                {
                  marginBottom: 5,
                  columns: [
                    {
                      text: t('payments.pdf.receiptNo'),
                      bold: true,
                      width: '*',
                      fontSize: 17,
                      alignment: 'right',
                      style: 'label',
                    },
                    {
                      text: this.payment.counter,
                      bold: true,
                      fontSize: 14,
                      marginTop: 2,
                      alignment: 'right',
                    },
                  ],
                },
                {
                  marginBottom: 5,
                  columns: [
                    {
                      text: t('payments.pdf.dateIssued'),
                      bold: true,
                      width: '*',
                      fontSize: 12,
                      alignment: 'right',
                      style: 'label',
                    },
                    {
                      text: format(this.payment.date, 'dd/MM/yyyy'),
                      bold: true,
                      fontSize: 12,
                      alignment: 'right',
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: t('payments.pdf.amount'),
                      bold: true,
                      width: '*',
                      fontSize: 12,
                      alignment: 'right',
                      style: 'label',
                    },
                    {
                      text: toQuantity(this.payment.amount),
                      bold: true,
                      fontSize: 12,
                      alignment: 'right',
                    },
                  ],
                },
              ],
            },
          ],
        ],
      },
    };
  }

  private getMemberInfo(): Content {
    const { member } = this.payment;

    if (isMinor(this.payment.member.taxCode)) {
      const {
        member: { parent },
      } = this.payment;

      return {
        stack: [
          {
            layout: tableLayout,
            table: {
              widths: ['13%', '37%', '13%', '37%'],
              body: [
                [
                  {
                    border: [true, false, false, true],
                    text: t('payments.pdf.receivedBy'),
                    style: 'backgroundLabel',
                  },
                  {
                    border: [false, false, false, true],
                    text: `${parent!.name} ${parent!.surname}`.toUpperCase(),
                  },
                  {
                    border: [false, false, false, true],
                    alignment: 'right',
                    text: t('payments.pdf.taxCode'),
                    style: 'label',
                  },
                  {
                    border: [false, false, true, true],
                    text: parent!.taxCode,
                  },
                ],
                [
                  {
                    border: [true, false, false, false],
                    text: t('payments.pdf.student'),
                    style: 'backgroundLabel',
                  },
                  {
                    border: [false, false, false, true],
                    text: `${member.name} ${member.surname}`.toUpperCase(),
                  },
                  {
                    border: [false, false, false, false],
                    text: t(`payments.pdf.born.${getSex(member.taxCode) === 'male' ? 'him' : 'her'}`),
                    alignment: 'right',
                    style: 'label',
                  },
                  {
                    border: [false, false, true, true],
                    text: format(member.birthday, 'dd/MM/yyyy'),
                  },
                ],
                [
                  {
                    border: [true, false, false, false],
                    text: t('payments.pdf.birthPlace'),
                    colSpan: 3,
                    alignment: 'right',
                    style: 'label',
                  },
                  {},
                  {},
                  {
                    border: [false, false, true, true],
                    text: municipalities[member.taxCode.slice(11, 15)].toUpperCase(),
                  },
                ],
                [
                  {
                    border: [true, false, false, true],
                    text: t('payments.pdf.address'),
                    style: 'label',
                  },
                  {
                    border: [false, false, true, true],
                    colSpan: 3,
                    text: member.address,
                  },
                ],
              ],
            },
          },
        ],
      };
    }

    return {
      layout: tableLayout,
      table: {
        widths: ['13%', '37%', '13%', '37%'],
        body: [
          [
            {
              border: [true, false, false, false],
              text: t('payments.pdf.receivedBy'),
              style: 'backgroundLabel',
            },
            {
              border: [false, false, false, true],
              text: `${member.name} ${member.surname}`.toUpperCase(),
            },
            {
              border: [false, false, false, true],
              alignment: 'right',
              text: t('payments.pdf.taxCode'),
              style: 'label',
            },
            {
              border: [false, false, true, true],
              text: member.taxCode,
            },
          ],
        ],
      },
    };
  }

  private getAmount(): Content {
    return {
      layout: tableLayout,
      table: {
        widths: ['5%', '95%'],
        body: [
          [
            {
              border: [true, false, false, false],
              fontSize: 20,
              bold: true,
              text: '€',
              style: 'label',
              alignment: 'center',
            },
            {
              border: [false, false, true, false],
              stack: [
                {
                  canvas: Array(10)
                    .fill(undefined)
                    .map((_, index) => ({
                      type: 'line',
                      dash: {
                        length: 100,
                        space: 0.2,
                      },
                      x1: 0,
                      y1: (index + 1) * 2,
                      x2: 475,
                      y2: (index + 1) * 2,
                      lineWidth: 1,
                      lineColor: defaultColor,
                    })),
                },
                {
                  text: cardinalConverter(this.payment.amount, { includeDecimals: true }).toUpperCase(),
                  fontSize: 15,
                  bold: true,
                  margin: [0, -17],
                },
              ],
            },
          ],
          [
            {
              colSpan: 2,
              alignment: 'center',
              border: [true, false, true, false],
              italics: true,
              fontSize: 7,
              text: `(${t('payments.pdf.inLetters')})`,
              style: 'label',
            },
          ],
        ],
      },
    };
  }

  private getReason(): Content {
    return {
      layout: tableLayout,
      table: {
        widths: ['5%', '95%'],
        body: [
          [
            {
              border: [true, false, false, false],
              text: t('payments.pdf.for'),
              style: 'label',
            },
            {
              border: [false, false, true, true],
              text: this.payment.reason.toUpperCase(),
            },
          ],
        ],
      },
    };
  }

  private getTaxStampAndSignature(): Content {
    return {
      layout: tableLayout,
      table: {
        widths: ['50%', '50%'],
        body: [
          [
            {
              border: [true, false, false, true],
              marginLeft: 50,
              layout: tableLayout,
              table: {
                widths: [125],
                heights: [82],
                body: [
                  [
                    {
                      alignment: 'center',
                      fontSize: 10,
                      marginTop: 22,
                      text: 'MARCA\nDA\nBOLLO',
                      style: 'label',
                    },
                  ],
                ],
              },
            },
            {
              border: [false, false, true, true],
              marginTop: 60,
              layout: tableLayout,
              table: {
                widths: ['15%', '85%'],
                body: [
                  [
                    {
                      border: [false, false, false, false],
                      text: t('payments.pdf.signature'),
                      style: 'label',
                    },
                    {
                      border: [false, false, false, true],
                      image: signatureUri,
                      width: 150,
                      height: 20,
                      marginTop: -3,
                    },
                  ],
                ],
              },
            },
          ],
        ],
      },
    };
  }
}

export default PDF;
