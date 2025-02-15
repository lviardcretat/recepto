{
  description = "A nodeJs test project";
  inputs.nixpkgs.url = "nixpkgs/nixos-unstable";
  inputs.flake-utils.url = "github:numtide/flake-utils";
  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system: let
    	pkgs = nixpkgs.legacyPackages.${system};
    in {
      	devShell = pkgs.mkShell {
			nativeBuildInputs = [ pkgs.bashInteractive ];
			buildInputs = with pkgs; [
				biome
				lefthook
				nodejs
				openssl
				pnpm
			];
      	};
    });
}
