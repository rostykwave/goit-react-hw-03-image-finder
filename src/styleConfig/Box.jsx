import styled from 'styled-components';
import { grid, layout, flexbox, typography, color } from 'styled-system';

export const Box = styled('div')(grid, layout, flexbox, typography, color);

// { color, space, layout, background, shadow }
