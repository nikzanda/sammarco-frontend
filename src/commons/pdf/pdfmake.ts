import pdfMake from 'pdfmake/build/pdfmake';
// @ts-expect-error vfs is exported by the pdfmakeVfsPlugin in vite.config.ts
import { vfs } from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = vfs;

export default pdfMake;
