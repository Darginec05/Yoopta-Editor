import s from './LanguageSelect.module.scss';

const LanguageSelect = ({ onChange, value }) => {
  return (
    <div contentEditable={false} className={s.select}>
      <select value={value} onChange={onChange}>
        <option value="javascript">JavaScript</option>
        <option value="go">Go</option>
        <option value="java">Java</option>
        <option value="kotlin">Kotlin</option>
        <option value="php">PHP</option>
        <option value="csharp">C#</option>
        <option value="swift">Swift</option>
        <option value="r">R</option>
        <option value="ruby">Ruby</option>
        <option value="bash">Bash</option>
        <option value="c">C</option>
        <option value="cpp">C++</option>
        <option value="matlab">Matlab</option>
        <option value="typescript">TypeScript</option>
        <option value="scala">Scala</option>
        <option value="sql">SQL</option>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
        <option value="jsx">JSX</option>
        <option value="tsx">TSX</option>
        <option value="markdown">Markdown</option>
      </select>
    </div>
  );
};

export { LanguageSelect };
