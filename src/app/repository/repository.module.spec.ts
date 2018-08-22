import { RepositoryModule } from './repository.module';

describe('RepositoryModule', () => {
  let repositoryModule: RepositoryModule;

  beforeEach(() => {
    repositoryModule = new RepositoryModule();
  });

  it('should create an instance', () => {
    expect(repositoryModule).toBeTruthy();
  });
});
