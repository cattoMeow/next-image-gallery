import Head from "next/head";
import {
  Box,
  Container,
  Text,
  Wrap,
  Flex,
  WrapItem,
  Input,
  IconButton,
  InputRightElement,
  InputGroup,
  useToast,
} from "@chakra-ui/react";
import { Search2Icon, SearchIcon } from "@chakra-ui/icons";
import { getCuratedPhotos, getQueryPhotos } from "@/lib/api";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home({ data }) {
  // console.log(data);
  const [photos, setPhotos] = useState(data);
  const [query, setQuery] = useState("");
  const toast = useToast();

  const handleSubmit = async (e) => {
    await e.preventDefault();
    if (query == "") {
      toast({
        title: "Error",
        description: "Empty Search",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: top,
      });
    } else {
      const res = await getQueryPhotos(query);
      await setPhotos(res);
      // await setQuery("");
      // await console.log(query);
    }
  };
  return (
    <div>
      <Head>
        <title>NextJS Image Gallery</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <Box overflow="hidden" bg="purple.100" minH="10vh">
        <Container maxW="1600">
          <Text
            color="pink.800"
            fontWeight="semibold"
            mb="1rem"
            textAlign="center"
            textDecoration="underline"
            fontSize={["4xl", "4xl", "5xl", "5xl"]}
          >
            NextJS Image Gallery
          </Text>
          <form onSubmit={handleSubmit}>
            <InputGroup pb="1rem">
              <Input
                placeholder="search for apple"
                variant="ghost"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <InputRightElement
                children={[
                  <IconButton
                    aria-label="Search"
                    icon={<Search2Icon />}
                    onClick={handleSubmit}
                    bg="pink.400"
                    color="white"
                  />,
                ]}
              />
            </InputGroup>
          </form>
          <Wrap px="1rem" spacing={4} justify="center">
            {photos.map((pic) => (
              <Flex minWidth="max-content" alignItems="center" gap="2">
                <WrapItem
                  key={pic.id}
                  boxShadow="sm"
                  rounded="20px"
                  overflow="hidden"
                  // bg="white"
                  lineHeight="0"
                  _hover={{ boxShadow: "dark-lg" }}
                >
                  <Link href={`/photos/${pic.id}`}>
                    <Image
                      src={pic.src.large}
                      width="500"
                      height="500"
                      alt={pic.url}
                      loading="lazy"
                      // blurDataURL={pic.src.original}
                      // placeholder="blur"
                    />
                  </Link>
                </WrapItem>
              </Flex>
            ))}
          </Wrap>
        </Container>
      </Box>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await getCuratedPhotos();
  return {
    props: {
      data,
    },
  };
}
