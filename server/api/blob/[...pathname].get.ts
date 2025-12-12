export default eventHandler(async (event) => {
  const pathname = getRouterParam(event, 'pathname');
  return hubBlob().serve(event, pathname as string);
});
