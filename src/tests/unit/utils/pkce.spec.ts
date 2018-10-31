import { ProofKey } from '../../../utils/pkce';

describe('ProofKey Class', () => {
  const codeVerifier = ProofKey.codeVerifierGenerator();
  const regX = new RegExp(/[a-zA-Z0-9_-]/);
  it('should generate a code_verifier', async () => {
    expect(typeof codeVerifier).toBe('string');
    expect(codeVerifier).toMatch(regX);
  });

  it('should generate a code challenge', async () => {
    const codeChallenge = ProofKey.codeChallengeGenerator(codeVerifier);
    expect(typeof codeChallenge).toBe('string');
    expect(codeChallenge).toMatch(regX);
  });
});
