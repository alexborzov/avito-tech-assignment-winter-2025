import { expect, test } from 'vitest'

import baseConfig from '@alex/ts/base' with { type: 'json' }
import nextjsConfig from '@alex/ts/nextjs' with { type: 'json' }
import nodeConfig from '@alex/ts/node' with { type: 'json' }
import reactConfig from '@alex/ts/react' with { type: 'json' }
import gatsbyConfig from '@alex/ts/gatsby' with { type: 'json' }
import nestjsConfig from '@alex/ts/nestjs' with { type: 'json' }
import fastifyConfig from '@alex/ts/fastify' with { type: 'json' }
import viteConfig from '@alex/ts/vite' with { type: 'json' }

import TSCONFIG_BASE_JSON from '../src/typescript.base.json'
import TSCONFIG_NODE_JSON from '../src/typescript.node.json'
import TSCONFIG_NEXTJS_JSON from '../src/typescript.nextjs.json'
import TSCONFIG_REACT_JSON from '../src/typescript.react.json'
import TSCONFIG_GATSBY_JSON from '../src/typescript.gatsby.json'
import TSCONFIG_NESTJS_JSON from '../src/typescript.nestjs.json'
import TSCONFIG_FASTIFY_JSON from '../src/typescript.fastify.json'
import TSCONFIG_VITE_JSON from '../src/typescript.vite.json'

test('TSCONFIG_BASE should match the config from JSON', () => expect(baseConfig).toEqual(TSCONFIG_BASE_JSON))
test('TSCONFIG_NODE should match the config from JSON', () => expect(nodeConfig).toEqual(TSCONFIG_NODE_JSON))
test('TSCONFIG_NEXTJS should match the config from JSON', () => expect(nextjsConfig).toEqual(TSCONFIG_NEXTJS_JSON))
test('TSCONFIG_REACT should match the config from JSON', () => expect(reactConfig).toEqual(TSCONFIG_REACT_JSON))
test('TSCONFIG_GATSBY should match the config from JSON', () => expect(gatsbyConfig).toEqual(TSCONFIG_GATSBY_JSON))
test('TSCONFIG_NESTJS should match the config from JSON', () => expect(nestjsConfig).toEqual(TSCONFIG_NESTJS_JSON))
test('TSCONFIG_FASTIFY should match the config from JSON', () => expect(fastifyConfig).toEqual(TSCONFIG_FASTIFY_JSON))
test('TSCONFIG_VITE should match the config from JSON', () => expect(viteConfig).toEqual(TSCONFIG_VITE_JSON))
