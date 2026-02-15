import React from 'react';
import ReactQuill, { ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules: ReactQuillProps['modules'] = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link'],
    ['clean'],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats: ReactQuillProps['formats'] = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'color',
  'background',
  'list',
  'bullet',
  'indent',
  'link',
];

const filterEmpty = (value?: string) => (value !== '<p><br></p>' ? value : undefined);

interface Props {
  placeholder?: string;
  value?: string;
  onChange?: (value?: string) => void;
}

const QuillEditor: React.FC<Props> = ({ placeholder = undefined, value = '', onChange = () => {} }) => (
  <ReactQuill
    theme="snow"
    placeholder={placeholder}
    modules={modules}
    formats={formats}
    className="quill-light-style"
    value={value}
    onChange={(value) => onChange!(filterEmpty(value))}
  />
);

export default QuillEditor;
