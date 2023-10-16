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
      pageSize: 'A6',
      pageOrientation: 'landscape',
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
                stack: [
                  {
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
                        width: 100,
                      },
                    ],
                  },
                  {
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
                        width: 100,
                      },
                    ],
                  },
                ],
              },
            ],
          ],
        },
      },
    ];
  }

  // private generateContent(): Content {
  //   return [
  //     {
  //       table: {
  //         body: [
  //           [
  //             {
  //               border: [false, true, false, true],
  //               alignment: 'center',
  //               bold: true,
  //               text: [
  //                 'A.s.d. SCUOLA SAMMARCO\n',
  //                 { text: 'Sede legale: ', italics: true, bold: false },
  //                 'Via Parpaiola, 12/1\n',
  //                 '35011 CAMPODARSEGO (PD)\n',
  //                 'C.F. 92258630281',
  //               ],
  //             },
  //             {
  //               border: [false, true, false, true],
  //               alignment: 'right',
  //               text: [
  //                 {
  //                   text: [
  //                     'RICEVUTA n. ',
  //                     {
  //                       text: this.payment.counter,
  //                     },
  //                   ],
  //                 },
  //                 '\n',
  //                 {
  //                   text: [
  //                     'Data ',
  //                     {
  //                       text: format(this.payment.date, 'ddMMyyyy'),
  //                     },
  //                   ],
  //                 },
  //                 '\n',
  //                 {
  //                   text: [
  //                     'Importo di € ',
  //                     {
  //                       text: this.payment.amount,
  //                     },
  //                   ],
  //                 },
  //               ],
  //             },
  //           ],
  //           [
  //             {
  //               border: [false, false, false, true],
  //               colSpan: 2,
  //               text: [
  //                 'Ricevuti da ',
  //                 {
  //                   text: `${this.payment.member.name} ${this.payment.member.surname}`.toUpperCase(),
  //                 },
  //               ],
  //             },
  //           ],
  //           [
  //             {
  //               border: [false, false, false, false],
  //               colSpan: 2,
  //               text: this.payment.member.taxCode
  //             }
  //           ],
  //           [
  //             {
  //               border: [false, true, false, false],
  //               colSpan: 2,
  //               text: [
  //                 '€ ',
  //                 {
  //                   canvas: Array(10).fill(undefined).map((_, index) => ({
  //                     type: 'line',
  //                     dash: {
  //                       length: 100,
  //                       space: 0.2
  //                     },
  //                   x1: 0, y1: (index + 1) * 2,
  //                   x2: 300, y2: (index + 1) * 2,
  //                   lineWidth: 1,
  //                   lineColor: 'blue'
  //                   }))
  //                   },
  //                   {
  //                   text: 'TODO: number to letters',
  //                   margin: [0, -15]
  //                   },
  //               ],
  //             },
  //           ],
  //           [
  //             {
  //               border: [false, false, false, false],
  //               text: 'quota sociale e ass. int. A e contributo per corso jujitsu mese settembre'
  //             },
  //             {
  //               rowSpan: 2,
  //               text: 'marca da bollo'
  //             }
  //           ],
  //           [
  //             {
  //               text: 'Firma'
  //             }
  //           ]
  //         ],
  //       },
  //     },
  //   ];
  // }
}

export default PDF;
