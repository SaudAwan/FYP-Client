import React from 'react';
import ReactQuill, {Quill} from 'react-quill';
import '../commonStyles/quill.css';
import MagicUrl from 'quill-magic-url'


Quill.register('modules/magicUrl', MagicUrl)
const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link']
  ],
  magicUrl: {
    // Regex used to check URLs during typing
    urlRegularExpression: /(https?:\/\/[\S]+)|(www.[\S]+)|(tel:[\S]+)/g,
    // Regex used to check URLs on paste
    globalRegularExpression: /(https?:\/\/|www\.|tel:)[\S]+/g,
  },
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent', 'link'
];

const QuillInput = (props) => {
  const { value, onChange, isError, placeholder } = props;
  return (
    <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        className='flex flex-flow_column'
        placeholder={placeholder || ''}
        modules={modules}
        formats={formats}
        style={{height:'100%'}}
      ></ReactQuill>
  );
};


export { QuillInput };
