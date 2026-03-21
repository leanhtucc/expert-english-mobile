import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { ClipPath, Defs, G, Image, Path, Pattern, Rect, Use } from 'react-native-svg';

const SvgImageMascotPeeking = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 111 161" {...props}>
    <G opacity={0.9}>
      <G clipPath="url(#a)">
        <Rect
          width={128}
          height={131.991}
          y={33.129}
          fill="#EE2B4B"
          fillOpacity={0.1}
          rx={64}
          transform="rotate(-15 0 33.129)"
        />
        <Path fill="url(#b)" d="M0 0h95.99v95.999H0z" transform="rotate(-15 243.316 -29.84)" />
      </G>
      <Rect
        width={124}
        height={127.991}
        x={2.449}
        y={34.543}
        stroke="#fff"
        strokeWidth={4}
        rx={62}
        transform="rotate(-15 2.45 34.543)"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Rect
          width={128}
          height={131.991}
          y={33.129}
          fill="#fff"
          rx={64}
          transform="rotate(-15 0 33.129)"
        />
      </ClipPath>
      <Pattern id="b" width={1} height={1} patternContentUnits="objectBoundingBox">
        <Use xlinkHref="#c" transform="scale(.0052)" />
      </Pattern>
      <Image
        xlinkHref="data:image/jpeg;base64,/9j/2wBDAAgICAgJCAkKCgkNDgwODRMREBARExwUFhQWFBwrGx8bGx8bKyYuJSMlLiZENS8vNUROQj5CTl9VVV93cXecnNH/2wBDAQgICAgJCAkKCgkNDgwODRMREBARExwUFhQWFBwrGx8bGx8bKyYuJSMlLiZENS8vNUROQj5CTl9VVV93cXecnNH/wgARCADAAMADASIAAhEBAxEB/8QAHAABAQADAQEBAQAAAAAAAAAAAAEFBgcEAwII/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAECAwQF/9oADAMBAAIQAxAAAADr1lQAgyv3+H3UAAAAAACpTBhAEoyn38/pWACAAoAABZTBhCCpTxbTpO7EUsURUAJZQAFBgwkWCwYrcvB+TI/nX/sZxjPSepLKAlEWAFFYIJUCymBmNzNz7PTzLoBkvp8Pov39Xg/cuUnm9SwAAFBgglILKajrewcR1z+vi/on+ZvT8vr/AEf+QPV5fr/2N9OJdcMllsHmpfpLJQoCpTBBAKlTnfNeq+Szgnz7xzKzU8xiN/6efE+zZdxvPcM/qG28Pf8AeWKABQYMJFEonOtU3TkFnVclw/uJied9Z+pybtl2yXW9vFgUABQwYRLAU1/x6vsnXz6pmNrxvLt0XzYDZmv2FILAAAWUwSkQAOee/H/bfLa/h+8FneV2fhHZpdmlNQAAAFSmCsIAQc/2rDZ65+n55/0eMVtWL/K7PLGgAAABTAhFhAMr6fP6FwWudA8RgvXcyfWUsURRFEUAf//EAEEQAAIBAwIDBAYFBw0AAAAAAAECAwAEEQUhBhJBEzFAUSIyQmFxgQcQFDCxFTRDUmKRoSAjJDNTY3KEorLBwtL/2gAIAQEAAT8A/lWv5uvxPiLX+oX4nxFr+br8T4i1I7FRkZ328RYSSjiGeLJ5Daq/q/L1vEWKBuKp3LuuLdQFHqsQvXxEFhFNxF9pkeUMkQVUBAUgDOTj6jgbkgUHQ9zqfn4WxgSMTznAaQjJ9yjFXmoLAezjw0nXyWhK7kvI5PvNRnbJG53pZCCCGIxSXJ9sfMUrKwypz4K+vpUu5Ie0bsY0VmXOxLeqtWqnG595+JoblV+ZoUDQalJByp3pJ+j/ALx4HUDnV5kXu9Bm97coAqABV3IAA3NWX0g27XlylxYyC27UiKeL0yU6F0qxv7O/h7a0uElTqVPd8R0oNQIrNBqhm3CMe/YeAvcDWJfgh/01xzrT2GjfZYHxc3uY181j9tqsdK4litPtcdvM0OObJXIxUOuXUOoxTtPJAy7FoTymrD6SbSMol8TIn9qi4b5rWn6pYalAJ7K6jnj6lD3fEdK5qQ0xwwx03pW5lVvMZ+/v3C63Nk4HKn+2tc1hdU183ec2yMEhH92h/wC1Qanpj2K3KXEQg5Ac5AAFa7JDNqV1LbriJpXKD3E0S1WGoXthcLPZ3MkMo9tDg1oX0oEckOtQf5mEfxdKsNRsr+3W5s7mOaE+2hyK5s+l571EMRR/4R9/rypLq9zBID2ckSq+CR6LLg7itW4KvLVTLpxa5gHsfpU/9V2sqgrzEYOCPqKqelaLw9daxdCG3UebMdgorX+Db7RYklco8Tbc6V9G1heT6+ZI5pY7eBOebkJAfoqNTNt7zsPiat37SCJ8g5X7/iKwuors35TNvLyrzj2WUYw1WtyVwDWq6BpOsgvPFyT9J49n+fRq1bg/V9O5pET7VAP0kQ3A/aSga4H4gs9JuZkuto5VA5/IiuNuK9OvrFbOzftAzhneuDdG/I+ixJIuLic9tN7iw2X5CpLg9sEU93o/Mjf9wq2j7OCNfd9/rXF+oaNrl1bSIk+nGJA0Dj9ZQTV5xdoP5RRbCKdLN41Lc+/ZP1UeairW6imjWSGRXQ9zKcio5yCN61ThrRtW5nmg7Oc/pocI3z6NWpcCavaktZlbyL9j0ZPmprgzh6W81YzXkDpDZsGZJFK80nsrg1cXIhjLd7HZQeprQ9PkkcXMqnsxuvNsWPgOJNKivbubmXOUX8K1bhy4tJGkjUletWF7cWT5tpGR/aXofiK0vR9YutJtb144+0lTm7IHB5eh386YTW7lJonjI6MCKE2wxuT3CrK2ubk4QE/rOe4VDY20UaKY1dgc87AE593l4G9MZvXUsObC7Z37qms45lKuvzrUuEoJCXRAG6HFcG6heaGw028naaB3JUdYs+VMquCrKGHkRmhY2KsWFrEG8+WgABgDA8FxY+q2+rvLAy9i3JkEhwAAAS69F99aPdG5gwwIZdiCclSDgrmhGKvNNjNyhX1mwTVnr0UUosZYLpmi2aYKpTfcDJbJIqORJUDo2VPg+Jbm0e/ubS4idFZEUzqo3BAPJzVo0PYJPzSo7tKxYp6uTvtSEU0yLLLK/dGv4b1p6c6CV/Xcl2+Lb1YNiQp0Zfw8Hr0kkOs3DRSN2jRLypuwwqgsfdWjadeXMcN3DI9nAxVlgkxJzqTlnKjGC9XSG2UyjeP8KvbTWH02S4jtXeP13CbuyjchRVvxvrVyG+xWdrEiqT/OlpG2I8sedcLnUZ7BbvUVhWViwQQ5wVBxk58HxFarc386OzhSI88jFSQBuMirW5jkjXlI7ht5VNcRxQu8hHIBls92BuabV5tT4diubOB43uYY3VR3hG7xWkWttDCojt40xthUC1YkB3A6oP4HwerxOdRIWNmaRV5FA3bbFabw26Qu9zMyTMPRVO5PjU9tr+rXUljevHa2KOVm5HLTTKD6n7ANW7RpGkaKFRVCqo7gBsAKmiBDyxxlpApIUHHOR0+JrhzVIdUjaeFHQLlHR15WRgd1bwdoB2CHG+W+rV9JNz/SLbAuANx0kA/5qC6ZGKSAqwOCDsRSXKBeYtgDcmuGrtLzS+3RQFNzOAQAAwDnfwdp+br8T9d3p1neYM0XpDuddmqXhzT5fRkaZosYMZYcrfGoLeC2gjggiWOKNQqIowAB97//xAAgEQACAQMEAwAAAAAAAAAAAAABAgMAESESMDFQQEGR/9oACAECAQE/AO/AuQKniREBF+fu4STyahVGcBqnVAw04xkeK0bKqt6I3NbFQpOOh//EACIRAAIBBAEEAwAAAAAAAAAAAAECAwAEETAQBTFAQSAhMv/aAAgBAwEBPwDyxtz47EgMQO1dPvZrmV1dAAB69VjgaQqjsMVePLHA7RDLVYSTyQkzA5z9EjFDXjSkySO6D9KTsEcYcuFAY8DYNeKHz//Z"
        id="c"
        width={192}
        height={192}
        preserveAspectRatio="none"
      />
    </Defs>
  </Svg>
);
export default SvgImageMascotPeeking;
