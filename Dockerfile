FROM nginx:alpine
COPY dist/prod/* /app
WORKDIR /app  
RUN 
