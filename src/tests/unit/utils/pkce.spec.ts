import { ProofKey } from '../../../utils/pkce';

describe.only('ProofKey Class', () => {
  const regX = new RegExp(/[a-zA-Z0-9_-]/);
  it('should generate a code_verifier', async () => {
    const codeVerifier = await ProofKey.codeVerifierGenerator();
    expect(typeof codeVerifier).toBe('string');
    expect(codeVerifier).toMatch(regX);
  });

  it('should generate a code challenge', () => {
    const codeVerifier = 'gdB5Bo_IscL6InpPJzlwOL-4e5RI-QbK1YgdyX5YaIk';
    const codeChallenge = ProofKey.codeChallengeGenerator(codeVerifier);
    expect(typeof codeChallenge).toBe('string');
    expect(codeChallenge).toMatch(regX);
  });
});
