import { Box, Text, Heading, VStack, Badge, Button } from "@chakra-ui/react"; // Chakra UI imports
import { useNavigate } from "react-router-dom";

const PricingCard = ({
  title,
  price,
  features,
  isCustom = false,
  onBuy,
  isCustomfree = false,
  onContactOpen,
}) => {
  return (
    <Box
      bgGradient="linear(to-b, #F3ECFF, #FFFFFF)"
      borderRadius="xl"
      boxShadow="lg"
      p={6}
      textAlign="center"
      maxW="md"
      w="full"
      minH="500px"
      display="flex"
      flexDirection="column"
      transition="all 0.4s ease"
      _hover={{
        bgGradient: "linear(to-b, #E0D4FF, #FFFFFF)",
        boxShadow: "2xl",
      }}
    >
      <Badge
        colorScheme={isCustom ? "gray" : "purple"}
        borderRadius="full"
        px={4}
        py={1}
        mb={3}
      >
        {title}
      </Badge>
      <Text color="gray.600" fontSize="sm">
        {isCustom
          ? "If these plans don’t fit, let’s create one that suits you!"
          : `Perfect for those who need assistance enhancing their website.`}
      </Text>
      <Heading size={isCustom ? "md" : "lg"} mt={2}>
        {price}
        {!isCustom && (
          <Text as="span" fontSize="sm" color="gray.500">
            {" "}
            /month
          </Text>
        )}
      </Heading>
      <VStack
        align="start"
        spacing={2}
        mt={4}
        fontSize="sm"
        color="gray.600"
        flex="1"
        width="100%"
      >
        {features.map((feature, index) => (
          <Box key={index} display="flex" alignItems="flex-start" width="100%">
            <Text as="span" mr={2} mt="2px" flexShrink={0}>
              ✔
            </Text>
            <Text
              flex="1"
              wordBreak="break-word"
              whiteSpace="normal"
              textAlign="left"
            >
              {feature}
            </Text>
          </Box>
        ))}
      </VStack>

      {!isCustom && !isCustomfree && (
        <Button colorScheme="gray" w="full" mt={4} onClick={onBuy}>
          Buy Now
        </Button>
      )}
      {!isCustom && isCustomfree && (
        <Button colorScheme="gray" w="full" mt={4} onClick={onBuy}>
          Free
        </Button>
      )}

      {isCustom && (
        <Button colorScheme="purple" w="full" mt={4} onClick={onContactOpen}>
          Contact Us
        </Button>
      )}
    </Box>
  );
};

export default PricingCard;
