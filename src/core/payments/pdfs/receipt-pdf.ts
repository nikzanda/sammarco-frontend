/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Content, TDocumentDefinitions } from 'pdfmake/interfaces';
import { format } from 'date-fns';
import { cardinalConverter } from 'italian-numbers';
import apolloClient from '../../../apollo';
import { PaymentPdfQuery } from '../../../generated/graphql';
import { PAYMENT_PDF_QUERY } from '../queries.graphql';
import i18n from '../../../i18n';
import { toQuantity } from '../../../utils/utils';

const { t } = i18n;

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const defaultColor = '#116B92';

const tableLayout = {
  hLineColor: () => defaultColor,
  vLineColor: () => defaultColor,
};

class PDF {
  payment: PaymentPdfQuery['payment'];

  constructor(payment: PaymentPdfQuery['payment']) {
    this.payment = payment;
  }

  public static async print(paymentId: string) {
    const { data, error } = await apolloClient.query({
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

    pdfGenerated.open();
  }

  private generatePDF(): TDocumentDefinitions {
    return {
      info: { title: 'receipt.pdf' },
      content: this.generateContent(),
      // pageSize: 'A6',
      // pageOrientation: 'landscape',
      styles: {
        label: {
          color: defaultColor,
        },
      },
    };
  }

  private generateContent(): Content {
    return [this.getHeader(), this.getMemberInfo(), this.getAmount(), this.getReason(), this.getTaxStampAndSignature()];
  }

  private getHeader(): Content {
    return {
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
      layout: tableLayout,
    };
  }

  private getMemberInfo(): Content {
    return {
      table: {
        widths: ['12%', '88%'],
        body: [
          [
            {
              border: [true, false, false, false],
              text: t('payments.pdf.receivedBy'),
              style: 'label',
            },
            {
              border: [false, false, true, true],
              text: `${this.payment.member.name} ${this.payment.member.surname}`.toUpperCase(),
            },
          ],
        ],
      },
      layout: tableLayout,
    };
  }

  private getAmount(): Content {
    return {
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
                  text: `${cardinalConverter(this.payment.amount).toUpperCase()}/00`,
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
      layout: tableLayout,
    };
  }

  private getReason(): Content {
    let { reason: reasonText } = this.payment.fee;

    if (this.payment.month) {
      reasonText = reasonText.replaceAll('[MESE]', format(new Date(this.payment.month), 'MMMM yyyy'));
    }

    return {
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
              text: reasonText.toUpperCase(),
            },
          ],
        ],
      },
      layout: tableLayout,
    };
  }

  private getTaxStampAndSignature(): Content {
    return {
      table: {
        widths: ['50%', '50%'],
        body: [
          [
            {
              border: [true, false, false, true],
              marginLeft: 50,
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
              layout: tableLayout,
            },
            {
              border: [false, false, true, true],
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
                      text: '',
                    },
                  ],
                ],
              },
              layout: tableLayout,
            },
          ],
        ],
      },
      layout: tableLayout,
    };
  }
}

export default PDF;
