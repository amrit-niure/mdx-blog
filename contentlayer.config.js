import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettycode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'


/** @type {import('contentlayer/source-files').ComputedFields} */

const computedFields = {
    slug: {
        type: 'string',
        resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
    slugAsParams: {
        type: 'string',
        resolve: (doc) => `${doc._raw.flattenedPath.split('/').slice(1).join('/')}`,
    },
}

export const Doc = defineDocumentType(() => ({
    name: 'Doc',
    filePathPattern: `blog/**/*.mdx`,
    fields: {
        title: {
            type: 'string',
            required: true
        },
        description: {
            type: 'string',
        },
        tags: {
            type: 'string',
            list: true,
        },
        publishedAt: {
            type: 'string',
            required: true,
        },
        updatedAt: {
            type: 'string',
            required: true,
        },
        author: {
            type: 'string',
            required: true,
        },
        coverImage: {
            type: 'string',
        },
        coverImageAlt: {
            type: 'string',
        },
    },
    computedFields,
}))

export default makeSource({
    contentDirPath: 'src/content',
    documentTypes: [Doc],
    mdx: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            rehypeSlug,
            [
                rehypePrettycode,
                {
                    theme: 'github-dark',
                    onVisitLine(node) {
                        //Prevent Lines from collapsing in `display : grid ` mode , and allwo empty lines to be copy/pasted.
                        if (node.children.length === 0) {
                            node.children = [{ type: 'text', value: ' ' }]
                        }
                    },
                    onVisitHighlightedLine(node) {
                        node.properties.className.push('line--highlighted')
                    },
                    onVisitHighlightedWord(node) {
                        node.properties.className.push('word--highlighted')
                    },
                }
            ],
            [
                rehypeAutolinkHeadings,
                {
                    properties : {
                        className: ['subheading-anchor'],
                        ariaLabel: 'Link to section',
                    }
                }
            ]
        ]
    }
})