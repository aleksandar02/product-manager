const Header = ({ headlineText, children }) => {
  return (
    <header>
      <h1>{headlineText}</h1>
      <div className='header-actions'>{children}</div>
    </header>
  );
};

export default Header;
