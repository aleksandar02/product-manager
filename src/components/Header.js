const Header = ({ headlineText, children }) => {
  return (
    <header>
      <div className='header-content container'>
        <h1>{headlineText}</h1>
        <div className='header-actions'>{children}</div>
      </div>
    </header>
  );
};

export default Header;
