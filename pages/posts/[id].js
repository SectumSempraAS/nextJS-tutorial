import React from 'react'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

export default function Post({ postData, testData }) {
    console.log(testData)
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}) {
    const postData = await getPostData(params.id)
    const res = await fetch("https://run.mocky.io/v3/2541b054-2dea-42ff-bd17-536ab9f66e1e")
    const testData = await res.json()
    return{
        props: {
            postData,
            testData
        }
    }
}