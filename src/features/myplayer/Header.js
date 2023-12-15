const Header = ({ mp3Title, duration }) => {
  return (
    <header>
      <h3>
        {mp3Title} {duration}
      </h3>
    </header>
  );
};

export default Header;
