import { FC } from 'react';
import { allDocs } from 'contentlayer/generated'
import { notFound } from 'next/navigation';
interface pageProps {
    params : {
        slug : string
    }
};

async function getDocFromParams (slug : string){
    const doc = allDocs.find((doc) => doc.slugAsParams === slug)
    if(!doc){
        notFound()
    }
    return doc
}

const page: FC<pageProps> = async ({params}) => {
    const doc = await getDocFromParams(params.slug)
  return <div>{JSON.stringify(doc)} </div>;
};

export default page;