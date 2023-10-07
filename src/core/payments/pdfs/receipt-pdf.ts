/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Content, TDocumentDefinitions } from 'pdfmake/interfaces';
import { format } from 'date-fns';
import apolloClient from '../../../apollo';
import { PaymentPdfQuery } from '../../../generated/graphql';
import { PAYMENT_PDF_QUERY } from '../queries.graphql';

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
    };
  }

  private generateContent(): Content {
    return [
      {
        table: {
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
                alignment: 'right',
                text: [
                  {
                    text: [
                      'RICEVUTA n. ',
                      {
                        text: this.payment.counter,
                      },
                    ],
                  },
                  '\n',
                  {
                    text: [
                      'Data ',
                      {
                        text: format(this.payment.date, 'ddMMyyyy'),
                      },
                    ],
                  },
                  '\n',
                  {
                    text: [
                      'Importo di € ',
                      {
                        text: this.payment.amount,
                      },
                    ],
                  },
                ],
              },
            ],
            [
              {
                border: [false, false, false, true],
                colSpan: 2,
                text: [
                  'Ricevuti da ',
                  {
                    text: `${this.payment.member.name} ${this.payment.member.surname}`.toUpperCase(),
                  },
                ],
              },
            ],
            [
              {
                border: [false, true, false, true],
                colSpan: 2,
                text: [
                  '€ ',
                  {
                    text: this.payment.amount.toLocaleString(),
                  },
                ],
              },
            ],
          ],
        },
      },
    ];
  }
}

export default PDF;
