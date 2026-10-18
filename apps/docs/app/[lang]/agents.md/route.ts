import { createAgentsRoute } from '@/lib/ds/routes-agents';
import { config } from '@/lib/geistdocs/config';

const agentsRoute = createAgentsRoute({ config });

export const GET = agentsRoute.GET;
export const generateStaticParams = agentsRoute.generateStaticParams;
