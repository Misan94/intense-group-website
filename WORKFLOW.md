# 🌳 Git Workflow & Version Management

## 📋 Branch Structure

### Core Branches
- **`main`** - Production-ready code, always deployable
- **`develop`** - Integration branch for ongoing development  
- **`staging`** - Pre-production testing and client review

### Supporting Branches
- **`feature/*`** - New features and enhancements
- **`hotfix/*`** - Critical production bug fixes
- **`release/*`** - Version preparation and final testing
- **`experimental/*`** - Proof of concepts and experiments

## 🔄 Development Workflow

### 1. Feature Development
```bash
# Start from develop
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/your-feature-name

# Develop and commit
git add .
git commit -m "feat: implement your feature"

# Push to remote
git push -u origin feature/your-feature-name

# Create Pull Request to develop
```

### 2. Hotfix Process
```bash
# Start from main
git checkout main
git pull origin main

# Create hotfix branch
git checkout -b hotfix/critical-bug-fix

# Fix bug and commit
git add .
git commit -m "fix: resolve critical bug"

# Push and create PR to main
git push -u origin hotfix/critical-bug-fix
```

### 3. Release Process
```bash
# Create release branch from develop
git checkout develop
git pull origin develop
git checkout -b release/v1.1.0

# Final testing and version updates
# Update package.json version
# Update CHANGELOG.md

# Merge to main
git checkout main
git merge release/v1.1.0
git tag -a v1.1.0 -m "Release v1.1.0"
git push origin main --tags

# Merge back to develop
git checkout develop
git merge main
git push origin develop
```

## 🏷️ Semantic Versioning

### Version Format: `MAJOR.MINOR.PATCH`

- **MAJOR** - Breaking changes, complete redesigns
- **MINOR** - New features, enhancements
- **PATCH** - Bug fixes, small improvements

### Examples
- `v1.0.0` - Initial website launch
- `v1.1.0` - GSAP navigation added
- `v1.1.1` - Navigation bug fix
- `v2.0.0` - Complete redesign

## 📝 Commit Message Standards

### Format
```
type(scope): description

[optional body]

[optional footer]
```

### Types
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes
- `refactor` - Code refactoring
- `test` - Adding tests
- `chore` - Maintenance tasks

### Examples
```bash
feat(hero): add logo zoom preload animation
fix(navigation): resolve mobile menu crash
docs(readme): update deployment instructions
style(components): improve GSAP animation organization
```

## 🔒 Branch Protection Rules

### Main Branch
- ✅ Require pull request reviews (2+ reviewers)
- ✅ Require status checks to pass
- ✅ Require branches to be up to date
- ✅ Restrict pushes to main branch

### Develop Branch
- ✅ Require pull request reviews (1+ reviewer)
- ✅ Require status checks to pass
- ✅ Allow admin force pushes

## 🚀 Deployment Strategy

### Environment Mapping
- `main` → Production (intensegroup.com)
- `staging` → Staging (staging.intensegroup.com)
- `develop` → Development (dev.intensegroup.com)
- `feature/*` → Preview deployments

## ✅ Quality Gates

### Automated Checks
- ESLint/TypeScript validation
- Build success verification
- Performance benchmarks
- Accessibility audits

### Manual Review
- Code quality review
- Design system compliance
- Cross-browser testing
- Mobile responsiveness
- User experience validation

## 🎯 Feature Branch Naming

### Current Project Features
```
feature/preload-transitions
feature/scroll-animations
feature/navigation-system
feature/video-backgrounds
feature/mobile-optimization
feature/accessibility-improvements
feature/performance-optimization
feature/seo-enhancements
```

## 📋 Pull Request Checklist

- [ ] Feature implemented and tested
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] Cross-browser compatibility verified
- [ ] Mobile responsiveness tested
- [ ] Accessibility compliance checked
- [ ] Performance impact assessed
- [ ] SEO considerations addressed

## 🚨 Emergency Procedures

### Critical Bug Response
1. Identify production issue
2. Create hotfix branch from main
3. Implement minimal fix
4. Test thoroughly
5. Create emergency PR to main
6. Deploy immediately after approval
7. Merge back to develop
8. Create post-mortem if needed

## 📚 Resources

### Useful Commands
```bash
# View all branches
git branch -a

# Clean up merged branches
git branch -d feature/completed-feature

# View commit history
git log --oneline --graph

# Check branch status
git status

# View differences
git diff develop...feature/branch-name
```

### GitHub CLI Commands
```bash
# Create PR
gh pr create --title "Feature: Add new component" --body "Description"

# List PRs
gh pr list

# Review PR
gh pr review --approve

# Merge PR
gh pr merge --squash
```

## 🎪 Team Collaboration

### Code Review Guidelines
1. Check functionality and logic
2. Verify design system compliance
3. Test responsive behavior
4. Validate accessibility
5. Assess performance impact
6. Ensure documentation is updated

### Communication
- Use descriptive commit messages
- Reference issues in PRs
- Add meaningful PR descriptions
- Use labels for organization
- Comment on code for clarity

This workflow ensures high-quality, maintainable code and smooth team collaboration for the Intense Group website project.
