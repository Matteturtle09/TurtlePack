import * as Icons from 'react-icons/fa';
import { IconType } from 'react-icons';

interface DynamicIconProps {
  name: keyof typeof Icons;
}

const DynamicIcon = ({ name }: DynamicIconProps) => {
  const IconComponent: IconType = Icons[name];

  if (!IconComponent) {
    // Return a default icon
    return <Icons.FaBeer />;
  }

  return <IconComponent />;
};

export default DynamicIcon;
