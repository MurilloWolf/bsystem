export default interface UseCase {
  execute(input: Record<string, unknown>): unknown;
}
