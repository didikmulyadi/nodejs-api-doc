import { defineConfig } from 'tsup'

export default defineConfig(({ watch = false }) => ({
  clean: true,
  dts: true,
  entry: {
    index: 'src/index.ts',
  },
  external: [],
  format: ['cjs', 'esm', 'iife'],
  minify: true,
  sourcemap: 'inline',
  watch,
}))
