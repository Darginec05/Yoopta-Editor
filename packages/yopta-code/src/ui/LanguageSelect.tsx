import s from './LanguageSelect.module.scss';

const LanguageSelect = ({ onChange, value }) => {
  return (
    <div contentEditable={false} className={s.select}>
      <select value={value} onChange={onChange}>
        <option value="css">CSS</option>
        <option value="html">HTML</option>
        <option value="java">Java</option>
        <option value="javascript">JavaScript</option>
        <option value="jsx">JSX</option>
        <option value="markdown">Markdown</option>
        <option value="php">PHP</option>
        <option value="python">Python</option>
        <option value="sql">SQL</option>
        <option value="tsx">TSX</option>
        <option value="typescript">TypeScript</option>
      </select>
    </div>
  );
};

export { LanguageSelect };
