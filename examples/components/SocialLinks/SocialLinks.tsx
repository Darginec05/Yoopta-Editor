import s from './SocialLinks.module.scss';

const SocialLinks = () => {
  return (
    <div className={s.links}>
      <ul className={s.list}>
        <li className={s.link}>
          <a href="https://twitter.com/Makovski11" target="_blank">
            Twitter
          </a>
        </li>
        <li className={s.link}>
          <a href="https://github.com/Darginec05/Yopta-Editor" target="_blank">
            Github
          </a>
        </li>
        <li className={s.link}>
          <a href="https://yopage.co/blog/0zntIA46L4/W0epdDpnRa" target="_blank">
            Docs
          </a>
        </li>
        <li className={s.link}>
          <a href="https://discord.com/channels/1067503779924168715/1067503780398112835" target="_blank">
            Discord
          </a>
        </li>
      </ul>
    </div>
  );
};

export { SocialLinks };
