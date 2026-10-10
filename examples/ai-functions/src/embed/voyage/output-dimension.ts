import { voyage } from '@ai-toolkit/voyage';
import { embed } from 'ai';
import { run } from '../../lib/run';

run(async () => {
  const { embedding, usage } = await embed({
    model: voyage.embedding('voyage-4-large'),
    value: 'sunny day at the beach',
    dimensions: 512,
    providerOptions: {
      voyage: {
        inputType: 'document',
      },
    },
  });

  console.log(embedding);
  console.log(usage);
});
