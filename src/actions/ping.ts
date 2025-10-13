// app/actions/ping.ts
import isReachable from "is-reachable";

type Return = {
  status: string;
  time: number;
};

export async function pingURL(url: string): Promise<Return> {
  try {
    const start = performance.now();
    const reachable = await isReachable(url);
    const end = performance.now();
    const time = end - start;
    return reachable
      ? { status: "Up", time: time }
      : { status: "Down", time: time };
  } catch {
    return { status: "Down", time: 0 };
  }
}
