import logo from '../assets/img/priceme-logo.png';

interface Props {
  size?: 'sm' | 'md' | 'lg';
}

const SIZES = {
  sm: '50px',
  md: '100px',
  lg: '200px',
};

const Logo = ({ size = 'sm' }: Props) => {
  return <img src={logo} style={{ height: SIZES[size], width: SIZES[size] }} alt="Price Me Logo" />;
};

export default Logo;
