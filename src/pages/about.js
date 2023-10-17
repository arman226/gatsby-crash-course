import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import { graphql, useStaticQuery } from "gatsby"

const About = () => {
  const [show, setShow] = useState("")
  const [loading, setLoading] = useState(false)
  const {
    allFile: { nodes },
  } = useStaticQuery(graphql`
    {
      allFile(
        filter: {
          sourceInstanceName: { eq: "flatfiles" }
          extension: { eq: "json" }
        }
      ) {
        nodes {
          publicURL
        }
      }
    }
  `)

  useEffect(() => {
    if (nodes) {
      const { publicURL } = nodes[0]

      setLoading(true)
      fetch(publicURL)
        .then(response => response.json())
        .then(response => setShow(response))
        .catch(e => {
          alert(e)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [nodes])

  if (loading) {
    return <Layout>loading</Layout>
  }

  return <Layout>{show.test}</Layout>
}

export default About
