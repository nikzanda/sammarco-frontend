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

const { t } = i18n;

pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
              border: [false, true, false, true],
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
              border: [false, true, false, true],
              stack: [
                {
                  marginBottom: 5,
                  columns: [
                    {
                      text: t('Receipt No.'),
                      color: '#aaaaab',
                      bold: true,
                      width: '*',
                      fontSize: 12,
                      alignment: 'right',
                    },
                    {
                      text: this.payment.counter,
                      bold: true,
                      color: '#333333',
                      fontSize: 12,
                      alignment: 'right',
                    },
                  ],
                },
                {
                  marginBottom: 5,
                  columns: [
                    {
                      text: t('Date Issued'),
                      color: '#aaaaab',
                      bold: true,
                      width: '*',
                      fontSize: 12,
                      alignment: 'right',
                    },
                    {
                      text: format(this.payment.date, 'dd/MM/yyyy'),
                      bold: true,
                      color: '#333333',
                      fontSize: 12,
                      alignment: 'right',
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: t('importo di €'),
                      color: '#aaaaab',
                      bold: true,
                      width: '*',
                      fontSize: 12,
                      alignment: 'right',
                    },
                    {
                      text: this.payment.amount,
                      bold: true,
                      color: '#333333',
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
    return {
      table: {
        widths: ['15%', '85%'],
        body: [
          [
            {
              border: [false, false, false, false],
              text: 'Ricevuti da',
            },
            {
              border: [false, false, false, true],
              text: `${this.payment.member.name} ${this.payment.member.surname}`.toUpperCase(),
            },
          ],
        ],
      },
    };
  }

  private getAmount(): Content {
    return {
      table: {
        widths: ['5%', '95%'],
        body: [
          [
            {
              border: [false, false, false, false],
              fontSize: 20,
              bold: true,
              // alignment: 'right',
              text: '€',
            },
            {
              border: [false, false, false, false],
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
                      lineColor: 'blue',
                    })),
                },
                {
                  text: `${cardinalConverter(this.payment.amount).toUpperCase()}/00`,
                  margin: [0, -15],
                },
              ],
            },
          ],
        ],
      },
    };
  }

  private getReason(): Content {
    return {
      table: {
        widths: ['10%', '90%'],
        body: [
          [
            {
              border: [false, false, false, false],
              text: 'Per',
            },
            {
              border: [false, false, false, true],
              text: 'quota sociale e ass int a e contributo per mese settembre',
            },
          ],
        ],
      },
    };
  }

  private getTaxStampAndSignature(): Content {
    return {
      table: {
        widths: ['50%', '50%'],
        body: [
          [
            {
              border: [false, false, false, false],
              marginLeft: 50,
              table: {
                widths: [125],
                heights: [82],
                body: [
                  [
                    {
                      alignment: 'center',
                      text: '\nMARCA\nDA\nBOLLO\n',
                    },
                  ],
                ],
              },
            },
            {
              border: [false, false, false, false],
              table: {
                widths: ['15%', '85%'],
                body: [
                  [
                    {
                      border: [false, false, false, false],
                      text: 'Firma',
                    },
                    {
                      border: [false, false, false, true],
                      text: '',
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
