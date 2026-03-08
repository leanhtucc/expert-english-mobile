import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Defs, Image, Path, Pattern, Use } from 'react-native-svg';

const SvgIconAvatar1 = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 32 32" {...props}>
    <Path fill="url(#a)" d="M0 0h32v32H0z" />
    <Defs>
      <Pattern id="a" width={1} height={1} patternContentUnits="objectBoundingBox">
        <Use xlinkHref="#b" transform="scale(.01563)" />
      </Pattern>
      <Image
        xlinkHref="data:image/jpeg;base64,/9j/2wBDAAgICAgJCAkKCgkNDgwODRMREBARExwUFhQWFBwrGx8bGx8bKyYuJSMlLiZENS8vNUROQj5CTl9VVV93cXecnNH/2wBDAQgICAgJCAkKCgkNDgwODRMREBARExwUFhQWFBwrGx8bGx8bKyYuJSMlLiZENS8vNUROQj5CTl9VVV93cXecnNH/wgARCABAAEADASIAAhEBAxEB/8QAHAAAAgIDAQEAAAAAAAAAAAAAAAcCAwQFBggB/8QAGQEAAgMBAAAAAAAAAAAAAAAAAAQBAgUD/9oADAMBAAIQAxAAAABZANIEK83g3jy2WqCYHdQD6FjfWLjyN7CTr+SZXRga+GBaRU7kp6LS0sHz/wCk/OBFZbU7nRnRRF9g4k31Fb94nem5cJwC/H//xAAyEAACAQMDAQUGBQUAAAAAAAABAgMABBEFEjEhBiAiQXEHEBMmUYEURFKToWGRsdLy/9oACAEBAAE/APeZE4HWg6k4471xJsT1qPs92hlhWaLTJmjYZGAMkUOyvaT8NJcPp0iJGpY7iA2B9FqNtw57sdhLejwKSqPHvx1ba7begqy168hkhhm08C22AhkZmkCN0UlQKn128kuHih05Wttjli7MkjIvhfC4wCKuNNmsDh1YI7yfC39GKI23xDyPd0a/Fjeo7ruifCuP6ZyD9jUdrEsCOJWZUcH4bMqqMHPP+KW2jmLsJWWORyzxowZep69cZAPmK7Q6mupalJJGmyFCUjX7kk/c908GrMTWFtBbX8ZfNvGW8+VyDU0U13pl5DYRNETbSbGI2kkLQ4HcER5YhR/P9qOPEFHlya1e/hi7KW+rGxNzJFaxOApxgEDJY/pFaRqy3XZWbVDaNbu1rK5VznIUHDA/pNDBADDy5oxHlTuH8+4vsG6kkDk/WuDUmpb/AGUTsD41hFof3QtW2pbfZQGLeP4TWg/d20eayQRjmm5NTHwj1pXKuCK3BlDCo9S+R9ZsC3561kX0f/mhqXyLp1gG51O4c+iAf7UCea3ZfH0Wmr//xAAgEQEAAQMEAwEAAAAAAAAAAAABAwACEQQQEmEhIjFx/9oACAECAQE/AKlm4OMh+1FMXqZF6316khytyJ61oMsrxt9Q8766JkssD7mtDEx2Xj9ztmpTIdJUZge3b//EACERAQABAwQCAwAAAAAAAAAAAAECAAMRBAUSYRAiEyFx/9oACAEDAQE/AK0+m+WPJJPRWo0zbOQId+dsIysPGTyJexW5YLRyfZfo8ZCttvxs3Jsh4sa3G+XbsGI4Cs0Qyd1ZcT/SrzmR0eP/2Q=="
        id="b"
        width={64}
        height={64}
        preserveAspectRatio="none"
      />
    </Defs>
  </Svg>
);
export default SvgIconAvatar1;
