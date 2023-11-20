import React from "react";
import {
  Box,
  IconButton,
  Stack,
  Heading,
  Text,
  Container,
} from "@chakra-ui/react";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";
import Slider from "react-slick";
import "../src/App.css";

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: false,
  speed: 200,
  autoplaySpeed: 10000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export const CaptionCarousel = () => {
  const [slider, setSlider] = React.useState<Slider | null>(null);

  const openInNewTab = (url: string | undefined) => {
    window.open(url, "_blank", "noreferrer");
  };

  const cards = [
    {
      brand: "Nude project",
      price: "89€",
      link: "https://nude-project.com/collections/hoodies-nude-project/products/basic-patch-capsule-halfzip-black",
      position: "center",
      image:
        "https://nude-project.com/cdn/shop/files/7copia_4000x5000.jpg?v=1693584578",
    },
    {
      brand: "H&M",
      price: "38€",
      link: "https://www2.hm.com/fr_fr/productpage.1024674001.html",
      position: "center",
      image:
        "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F41%2Ffb%2F41fb1732fb6bdab4756e8f2c902b7e4ed827edb4.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
    },
    {
      brand: "H&M",
      price: "30€",
      link: "https://www2.hm.com/fr_fr/productpage.1019679055.html",
      position: "center",
      image:
        "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F72%2F41%2F72418b81f97e13add394e4e91368ade782068518.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
    },
    {
      brand: "Burga",
      price: "38€",
      link: "https://burga.fr/products/mirage-iphone-15-pro-coque?currency=EUR&variant=47325500997967&utm_medium=cpc&utm_source=google&utm_campaign=Google%20Shopping&stkn=013bcef6b881&nbt=nb%3Aadwords%3Ax%3A17895224598%3A%3A&nb_adtype=pla&nb_kwd=&nb_ti=&nb_mi=546555523&nb_pc=online&nb_pi=shopify_FR_8676914135375_47325500997967&nb_ppi=&nb_placement=&nb_li_ms=&nb_lp_ms=&nb_fii=&nb_ap=&nb_mt=&trc_gcmp_id=17895224598&gad_source=1&gclid=EAIaIQobChMIj5jyv6zSggMVEeXtCh3tgwiaEAQYAiABEgLzbfD_BwE&case-type=Tough%20(MagSafe)&couleur-des-d%C3%A9tails-de-la-coque=N%2FA",
      position: "center",
      image:
        "https://burga.fr/cdn/shop/files/SU_05-3_2bc544db-4ec4-46de-9f26-a3e82af13ba6_2048x.progressive.jpg?v=1694680006",
    },
    {
      brand: "Sony",
      price: "429€",
      link: "https://www.cdiscount.com/jeux-pc-video-console/ps5/console-playstation-5-edition-standard/f-1035001-ps5stdchassisc.html#mpos=0|cd",
      position: "bottom",
      image:
        "https://blog.fr.playstation.com/tachyon/sites/10/2023/10/b541dff3c5e0bc20f7f823556a6671d12ad55123.png?resize=1088%2C612&crop_strategy=smart",
    },
    {
      brand: "Ikea",
      price: "299€",
      link: "https://www.ikea.com/fr/fr/p/evedal-lampadaire-marbre-gris-40358592/",
      position: "center",
      image:
        "https://www.ikea.com/fr/fr/images/products/evedal-lampadaire-marbre-gris__0879783_pe688149_s5.jpg?f=xl",
    },
    {
      brand: "Delonghi",
      price: "270€",
      link: "https://www.cdiscount.com/electromenager/petit-dejeuner-cafe/machine-expresso-automatique-avec-broyeur-delong/f-1101727-bundelonghitasse.html?idOffre=2893247466#cm_sp=PA:12269985:NH:CAR",
      position: "center",
      image:
        "https://www.cafemichel.fr/331/machine-expresso-delonghi-magnifica.jpg",
    },
    {
      brand: "Toptro",
      price: "150€",
      link: "https://www.amazon.fr/dp/B0BDK6QTHX/?coliid=I3AY9T7CAV3YVZ&colid=7532RQ6K5TCN&psc=1&ref_=list_c_wl_lv_ov_lig_dp_it",
      position: "center",
      image:
        "https://www.toptro.com/cdn/shop/files/6_1024x1024@2x.jpg?v=1690190074",
    },
    {
      brand: "Nike",
      price: "120€",
      link: "https://www.zalando.fr/nike-sportswear-dunk-retro-baskets-basses-whiteblack-ni112o0gn-a11.html?size=43&allophones=0&wmc=SEM330_NB_GO._7455046171_205187277_11471707197.&opc=2211&mpp=google|v1||pla-297612067635||9056511||g|c||56861993277||pla|NI112O0GN-A110095000|297612067635|1|&gclsrc=aw.ds&gad_source=1&gclid=EAIaIQobChMIstKgqLPSggMVWC4GAB1o6gSmEAQYAyABEgILRvD_BwE",
      position: "bottom",
      image:
        "https://img01.ztat.net/article/spp-media-p1/ad8cde9c9d2745f4b714dfc872e64b9a/dbfd82f0b4d146138ca60ccb0ad1fe94.jpg?imwidth=1800",
    },
    {
      brand: "Nike",
      price: "130€",
      link: "https://www.courir.com/fr/p/nike-dunk-low-polar-blue-1513978.html",
      position: "bottom",
      image:
        "https://cdn.lesitedelasneaker.com/wp-content/images/2023/03/preview-nike-dunk-low-polar-blue-dv0833-400pic02.jpg",
    },
    {
      brand: "Horace",
      price: "135€",
      link: "https://www.octobre-editions.com/fr/product/pull-coper/ecru#size-XS",
      position: "center",
      image:
        "https://media.octobre-editions.com/image/upload/twr7crk9bdz35ln2g149.jpg",
    },
  ];

  return (
    <Box
      position={"relative"}
      height={"500px"}
      width={"1200px"}
      overflow={"hidden"}
      margin="120px auto"
    >
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <IconButton
        aria-label="left-arrow"
        variant="ghost"
        bg="transparent"
        border="transparent"
        cursor="pointer"
        position="absolute"
        left={50}
        top={"50%"}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <IoIosArrowRoundBack size="40px" />
      </IconButton>
      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        bg="transparent"
        border="transparent"
        cursor="pointer"
        position="absolute"
        right={50}
        top={"50%"}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <IoIosArrowRoundForward size="40px" />
      </IconButton>
      <Slider {...settings} ref={(slider: Slider) => setSlider(slider)}>
        {cards.map((card, index) => (
          <Box
            key={index}
            position="relative"
            backgroundPosition={card.position}
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`url(${card.image})`}
          >
            <Container size="container.lg" height={"100vh"} position="relative">
              <Stack
                w={"full"}
                maxW={"lg"}
                position="absolute"
                top="420px"
                ml="15px"
              >
                <Heading
                  fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                  fontFamily="circular"
                  mt="0"
                  mb="0"
                  onClick={() => openInNewTab(card.link)}
                  cursor="pointer"
                  _hover={{ textDecoration: "underline" }}
                >
                  {card.brand}
                </Heading>
                <Text
                  m={0}
                  fontSize={{ base: "md", lg: "lg" }}
                  color="GrayText"
                  fontFamily="circular"
                >
                  {card.price}
                </Text>
              </Stack>
            </Container>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};
