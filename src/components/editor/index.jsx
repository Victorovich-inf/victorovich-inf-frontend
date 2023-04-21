import PropTypes from 'prop-types';
import '../../utils/highlight';
import ReactQuill from 'react-quill';
import EditorToolbar, { formats } from './EditorToolbar';
import { StyledEditor } from './styles';
import 'react-quill/dist/quill.snow.css';

Editor.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.node,
  simple: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Editor({
  id = 'minimal-quill',
  error,
  value,
  onChange,
  simple = false,
  helperText,
  sx,
  ...other
}) {
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
    ],
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true,
    },
    syntax: true,
    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <>
      <StyledEditor
        sx={{
          ...(error && {
            border: (theme) => `solid 1px ${theme.palette.error.main}`,
          }),
          ...sx,
        }}
      >
        <EditorToolbar id={id} isSimple={simple} />

        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          {...other}
        />
      </StyledEditor>

      {helperText && helperText}
    </>
  );
}
