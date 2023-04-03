/** @format */
import Head from "next/head";

function ConvertFromTo({ fromCurrency, toCurrency }) {
  return (
    <>
      <Head>
        <title>ForexCalculator</title>
        <meta
          name='description'
          content={`Convert ${fromCurrency} to ${toCurrency}`}></meta>
      </Head>
      <h1>
        Convert {fromCurrency} to {toCurrency}
      </h1>
    </>
  );
}

export async function getStaticPaths() {
  const response = await fetch("https://run.mocky.io/v3/612d0b90-890a-4f30-8d6a-0b337b6c84da");
  const data = await response.json();
  const paths = data.map((item) => {
    return { params: { convertFromTo: item["Conversion Path"] } };
  });
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps(context) {
  const { params } = context;
  const { convertFromTo } = params;
  const fromToArray = convertFromTo.split("-");
  const [fromCurrency, ,toCurrency] = fromToArray;
  return {
    props: {
      fromCurrency: fromCurrency.toUpperCase(),
      toCurrency: toCurrency.toUpperCase(),
    },
  };
}

export default ConvertFromTo;
