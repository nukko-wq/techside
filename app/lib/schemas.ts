import { z } from 'zod'

// Zenn記事のスキーマ
export const ZennArticleSchema = z.object({
	id: z.number(),
	title: z.string(),
	slug: z.string(),
	emoji: z.string().optional(),
	user: z.object({
		name: z.string(),
	}),
	path: z.string(),
	likedCount: z.number(),
	publishedAt: z.string(),
})

export const ZennArticlesSchema = z.array(ZennArticleSchema)

// Qiita記事のスキーマ
export const QiitaArticleSchema = z.object({
	title: z.string(),
	link: z.string().url(),
	author: z.string(),
	pubDate: z.string(),
})

export const QiitaArticlesSchema = z.array(QiitaArticleSchema)

// Hatena記事のスキーマ
export const HatenaArticleSchema = z.object({
	title: z.string(),
	link: z.string().url(),
	bookmarkCount: z.number(),
	pubDate: z.string().optional(),
})

export const HatenaArticlesSchema = z.array(HatenaArticleSchema)

// API共通エラーレスポンススキーマ
export const ApiErrorSchema = z.object({
	error: z.string(),
	details: z.string().optional(),
})

// 型エクスポート
export type ZennArticle = z.infer<typeof ZennArticleSchema>
export type QiitaArticle = z.infer<typeof QiitaArticleSchema>
export type HatenaArticle = z.infer<typeof HatenaArticleSchema>
export type ApiError = z.infer<typeof ApiErrorSchema>