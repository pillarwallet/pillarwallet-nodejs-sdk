/*
Copyright (C) 2021 Stiftung Pillar Project

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
import { ProofKey } from '../../../utils/pkce';

describe('ProofKey Class', () => {
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
