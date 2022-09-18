import webpack from "webpack";

export function buildResolvers(): webpack.ResolveOptions {
  return {
    extensions: [".tsx", ".ts", ".js"],
  };
}
