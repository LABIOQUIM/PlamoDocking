import React from 'react';
import * as FeatherIcon  from 'react-feather';
import { twMerge } from 'tailwind-merge';

const iconMapping = {
  arrowRight: FeatherIcon.ArrowRight,
  heart: FeatherIcon.Heart,
  settings: FeatherIcon.Settings,
  headphones: FeatherIcon.Headphones,
  search: FeatherIcon.Search,
  userPlus: FeatherIcon.UserPlus,
  checkCircle: FeatherIcon.CheckCircle,
  clock: FeatherIcon.Clock,
  folder: FeatherIcon.Folder,
  home: FeatherIcon.Home,
  calendar: FeatherIcon.Calendar,
  mousePointer: FeatherIcon.MousePointer,
  alertCircle: FeatherIcon.AlertCircle,
  trash: FeatherIcon.Trash2,
  chevronDown: FeatherIcon.ChevronDown,
  image: FeatherIcon.Image,
  edit: FeatherIcon.Edit,
  plus: FeatherIcon.Plus,
  alertriangle: FeatherIcon.AlertTriangle,
  x: FeatherIcon.X,
  arrowLeft: FeatherIcon.ArrowLeft,
  lock: FeatherIcon.Lock,
  inbox: FeatherIcon.Inbox,
  xCircle: FeatherIcon.XCircle,
  wifi: FeatherIcon.Wifi,
  send: FeatherIcon.Send,
  chevronLeft: FeatherIcon.ChevronLeft,
  pieChart: FeatherIcon.PieChart,
  chevronRight: FeatherIcon.ChevronRight,
  messageCircle: FeatherIcon.MessageCircle,
  wifiOff: FeatherIcon.WifiOff,
  layout: FeatherIcon.Layout,
  moreVertical: FeatherIcon.MoreVertical,
  mail: FeatherIcon.Mail,
  slash: FeatherIcon.Slash,
  messageSquare: FeatherIcon.MessageSquare,
  shield: FeatherIcon.Shield,
  archive: FeatherIcon.Archive,
  dollarSign: FeatherIcon.DollarSign,
  user: FeatherIcon.User,
  star: FeatherIcon.Star,
  menu: FeatherIcon.Menu,
  helpCircle: FeatherIcon.HelpCircle,
  circle: FeatherIcon.Circle,
  check: FeatherIcon.Check,
  users: FeatherIcon.Users,
  logOut: FeatherIcon.LogOut,
  eye: FeatherIcon.Eye,
  eyeOff: FeatherIcon.EyeOff,
  filePlus: FeatherIcon.FilePlus,
  folderPlus: FeatherIcon.FolderPlus,
  
 
};

export type IconProps = {
  name: keyof typeof iconMapping;
  size?: number;
  color?: string;
} & React.SVGAttributes<SVGElement>;

const Icon: React.FC<IconProps> = ({ name, size = 24, color = 'black', className,...rest }) => {
  const IconComponent = iconMapping[name];
  const IconClassName = twMerge(``, className);

  return <IconComponent className={IconClassName} size={size} color={color} {...rest} />;
};

export default Icon;
