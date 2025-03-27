// jest.config.js - Vue 3 project Jest configuration
export default {
  globals: {
    'ts-jest': {
      useESM: true, // Enable ESM support for TypeScript
    },
    'vue-jest': {
      compilerOptions: {
        // isCustomElement: tag => tag.startsWith('el-') // Add support for custom elements in Vue templates
      }
    }
  },
  setupFiles: ['<rootDir>/_tests_/setup.js'], // Run custom setup code before each test suite
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.js$': 'babel-jest', // Use Babel for JavaScript files
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.ts?$': 'ts-jest',
    // '^.+\\.ts?$': 'babel-jest',
    // '^.+\\.tsx?$': 'babel-jest',
    
  },
  transformIgnorePatterns: [
    'node_modules/(?!element-plus)',
  ],
  testEnvironmentOptions: {
    "customExportConditions": [
      "node",
      "node-addons"
    ]
  },

  collectCoverage: true,
  collectCoverageFrom: [
    'src/utils/*.{js,ts,vue}', // Explicitly specify the file types to include in coverage reports
    'src/views/*.{js,ts,vue}',
    'src/components/*.{js,ts,vue}',
    // 'src/**/*.{js,ts,vue}'
  ],
  extensionsToTreatAsEsm: ['.tsx', '.jsx', '.ts','.vue'], // File extensions to treat as ECMAScript Modules (ESM)

  // Set coverage threshold goals
  coverageThreshold: {
    global: {
      branches: 60, // 60% branch coverage
      functions: 90, // 90% function coverage
      statements: 90, // 90% statement coverage
    },
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // 映射@别名
    '^element-plus/es': 'element-plus/lib',
    '^element-plus/es/components/(.*)': 'element-plus/lib/components/$1'
  }
};
