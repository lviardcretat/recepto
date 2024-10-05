{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
	buildInputs = with pkgs; [
		biome
		lefthook
		nodejs
		openssl
		pnpm
		prisma-engines
	];

    shellHook = ''
      export PRISMA_SCHEMA_ENGINE_BINARY="${pkgs.prisma-engines}/bin/schema-engine"
      export PRISMA_QUERY_ENGINE_BINARY="${pkgs.prisma-engines}/bin/query-engine"
      export PRISMA_QUERY_ENGINE_LIBRARY="${pkgs.prisma-engines}/lib/libquery_engine.node"
      export PRISMA_FMT_BINARY="${pkgs.prisma-engines}/bin/prisma-fmt"
      export PATH="$PWD/node_modules/.bin/:$PATH"
    '';
}
