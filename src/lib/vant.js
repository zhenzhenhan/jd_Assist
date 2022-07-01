import 'vant/lib/index.css'
import {
  Button,
  Cell,
  CellGroup,
  Empty,
  Field,
  Form,
  Loading,
  NavBar,
  NoticeBar,
  Overlay,
  Picker,
  Popup,
  SwipeCell,
  Tabbar,
  TabbarItem,
  Tag,
  Skeleton,
  List,
} from 'vant'
const components = [
  NoticeBar,
  Tabbar,
  TabbarItem,
  Field,
  CellGroup,
  Button,
  NavBar,
  Popup,
  Picker,
  Loading,
  Empty,
  Form,
  Tag,
  Overlay,
  SwipeCell,
  Cell,
  Skeleton,
  List,
]

export function VantComponents(app) {
  for (const component of components) {
    app.use(component)
  }
}
