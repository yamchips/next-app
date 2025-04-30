import {
  Html,
  Body,
  Container,
  Tailwind,
  Text,
  Link,
  Preview,
} from "@react-email/components";
import { CSSProperties } from "react";

const body: CSSProperties = {
  background: "lightblue",
};

const heading: CSSProperties = {
  fontSize: "32px",
};

const WelcomTemplate = ({ name }: { name: string }) => {
  return (
    <Html>
      <Preview> Welcome aboard!</Preview>
      <Tailwind>
        <Body className="bg-white">
          <Container>
            <Text className="font-bold text-4xl">Hello {name}</Text>
            <Link href="https://codewithmosh.com">www.codewithmosh.com</Link>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomTemplate;
