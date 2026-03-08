# Contributing

## Branching Strategy

- `main` — production-ready code, protected
- `dev` — integration branch for ongoing work
- `feature/<name>` — new features
- `fix/<name>` — bug fixes

Always branch from `dev` and open PRs back into `dev`.

## Commit Conventions

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add appointment booking screen
fix: correct time slot overlap logic
docs: update API endpoint table
chore: bump flutter dependencies
```

## Pull Requests

1. Branch from `dev`
2. Keep PRs focused — one concern per PR
3. Add a short description of what changed and why
4. Request review before merging

## Documentation

- All docs live in `lions-barbershop-dashboard/docs/`
- Update relevant docs in the same PR as the code change
- Never let docs fall behind the implementation
