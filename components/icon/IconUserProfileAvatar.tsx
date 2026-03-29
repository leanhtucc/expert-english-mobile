import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Defs, Image, Path, Pattern, Use } from 'react-native-svg';

const SvgIconUserProfileAvatar = (props: SvgProps) => (
  <Svg
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 36 36"
    {...props}
  >
    <Path fill="url(#a)" d="M0 0h36v36H0z" />
    <Defs>
      <Pattern id="a" width={1} height={1} patternContentUnits="objectBoundingBox">
        <Use xlinkHref="#b" transform="matrix(.01389 0 0 .01389 -.056 -.056)" />
      </Pattern>
      <Image
        xlinkHref="data:image/jpeg;base64,/9j/2wBDAAgICAgJCAkKCgkNDgwODRMREBARExwUFhQWFBwrGx8bGx8bKyYuJSMlLiZENS8vNUROQj5CTl9VVV93cXecnNH/2wBDAQgICAgJCAkKCgkNDgwODRMREBARExwUFhQWFBwrGx8bGx8bKyYuJSMlLiZENS8vNUROQj5CTl9VVV93cXecnNH/wgARCABQAFADASIAAhEBAxEB/8QAHAAAAgIDAQEAAAAAAAAAAAAAAAUEBwIGCAED/8QAGgEAAgMBAQAAAAAAAAAAAAAAAAQBAgMFBv/aAAwDAQACEAMQAAAAo0AAGpK/Nz7E66OU0wAEHoBk/R2/nroX1v36qOc/61ddNsqrj02w8ACd0ty3cKjthyGOHO6Smg7b58e54A8gAAMvGto6CnrpHA9Hznru5Ie951WBASYsyYc4fI1pvLGtvtdLHOOUdhQJ6/K//8QAMRAAAgIBAwEGAwcFAAAAAAAAAQIDBBEABRIhBhAgIjFBFFFhB0JSU3FysTNikaLB/9oACAEBAAE/APAleZ+oQ4+vTRqzj7n+NEYOCPHXrLGAzDL/AMd3HVmASIcjzD0Pij/qJ+4aRXkYLGjMxOAqjJOmrW4zh6sy/rGw1DTuzELFTncn2WNjq/t96g8K267QtInNFb1IBxq4oWdse4B8NeKWaxDFCheR5FVFHqST0GuxNYULG7WbNeVp65WuI405uHbJIAGqu6S2JxDJtd+DIJDyovDp9VY6vbg9QxqlC3ZL56QICBj5kka7bPFe2ZbJqTwT1Z0yJk4nhLrdalqndeGzEY34owB/CwyD4dsufA7jSt4yIZ0kI+YB1tFfb3W1eqSF0vMkjsrdDgY6Y9NbJs77VHYV701gyTM4Lk4VT6DqTrdtvbcqFiqlqWu7jyyRnBB/6NWdmqy7PHQsySPHGI2Zi2CWjwc9c4B12x3ODc9+nlgYNDGqwow9G4eL7K7sfDc6Jbz8knQf6nTsqr5mwPnqJkbPF+XzOvtGvJW7NyQFvPalSNR9FPJvHtdq7QtRX6knB4W6N/II9wdbVuyXtvp2ZQInmhSQrnp5vkdPahQYD829gDknXaHd7++23uTkcE8kca+ka+KCjyAaUkf2jVZhXaJ0RDwcMFYZU4OcEHVCzT3OhXsRKODIMKPuH3XRFapHJM5CIiksxPoBrdriX71uyIVjSRjxQAABdTUVI5RHB/CfTRBBIIwR31EDzrn0HXu6qw83l12T3R4J2pM+FlPKP6PrtbusghSir+aTzSfs9hpslsBunvjuvoBIrj7w6/qO+nJHHIxdgBx18XW/NGvi635q6S7DE6vHOAVII9ehHy1b3Vb1mWxNMAznJA0LVUDAkXXxdb80auzRSLHwcEgnu//EACQRAAEDBAEDBQAAAAAAAAAAAAEAAhEDEjFREAQTIRQgQWFx/9oACAECAQE/APdUfY0nJ0vVvmO2J/VRqXtBMA89WyW3g4z9hF7i+75XSMJmoTuBzZIMhODry20gzhNZDGw2PGOBkKRtdwWR4nakbTsr/8QAJhEAAQMDAwIHAAAAAAAAAAAAAQACEQMhMQQQEhNRFEFCYWJxgf/aAAgBAwEBPwBALijvSYXuAwO68KyJ6hj6VanwcQLi199HUAd0yLOMj2KFJoplsHj+rWPAik0diTvygiCmml0g8vkRc+Sc+Xul03zscKE7STqhV9OS35BQhhf/2Q=="
        id="b"
        width={80}
        height={80}
        preserveAspectRatio="none"
      />
    </Defs>
  </Svg>
);
export default SvgIconUserProfileAvatar;
