import 'ant-design-vue/dist/antd.css'
import {
  Button,
  InputSearch,
  Input,
  Divider,
  Spin,
  Tooltip,
  Radio,
  RadioGroup,
  RadioButton,
  Alert,
} from 'ant-design-vue'
const components = [
  Button,
  InputSearch,
  Input,
  Divider,
  Spin,
  Tooltip,
  Radio,
  RadioGroup,
  RadioButton,
  Alert,
]

export function AntdComponents(app) {
  for (const component of components) {
    app.use(component)
  }
}
