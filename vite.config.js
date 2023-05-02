import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import {resolve} from 'path';
// https://vitejs.dev/config/
// phai setup o vite config de su dung
const root = resolve(__dirname, 'src')
export default defineConfig({
  root,
  plugins: [react()],
})

