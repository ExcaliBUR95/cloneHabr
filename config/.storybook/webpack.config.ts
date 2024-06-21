import webpack, { DefinePlugin, RuleSetRule } from "webpack";
import path from "path";
import { buildCssLoader } from "../build/loaders/buildCssLoader";
import { BuildPaths } from "../build/types/config";

export default ({ config }: { config: webpack.Configuration }) => {
  const paths: BuildPaths = {
    build: "",
    html: "",
    entry: "",
    src: path.resolve(__dirname, "..", "..", "src"),
  };

  // Проверяем и модифицируем config.resolve.modules
  if (config.resolve?.modules) {
    config.resolve.modules.push(paths.src);
  } else {
    config.resolve = {
      ...config.resolve,
      modules: [paths.src],
    };
  }

  // Проверяем и модифицируем config.resolve.extensions
  config.resolve = config.resolve ?? {};
  config.resolve.extensions = config.resolve.extensions ?? [];
  config.resolve.extensions.push(".ts", ".tsx");

  // Обработка правил для модулей
  config.module = config.module ?? {};
  config.module.rules =
    config.module.rules?.map((rule: RuleSetRule | any) => {
      if (/svg/.test(rule.test as string)) {
        return { ...rule, exclude: /\.svg$/i };
      }
      return rule;
    }) ?? [];

  // Добавляем правила для SVG и CSS
  config.module.rules.push({
    test: /\.svg$/,
    use: ["@svgr/webpack"],
  });
  config.module.rules.push(buildCssLoader(true));

  // Добавление плагинов
  config.plugins = config.plugins ?? [];
  config.plugins.push(
    new DefinePlugin({
      __IS_DEV__: true,
    })
  );

  return config;
};
