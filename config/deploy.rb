ENV['TZ'] = 'UTC8'
set :branch, ENV['BRANCH'] if ENV['BRANCH']
set :application, 'houtai_front'
set :repo_url, 'git@gitlab.chupinxiu.com:server/front-admin.git'
set :keep_releases, 10

set :deploy_to, '/var/www/houtai_front/deploy'

set :components_dir, ->{fetch(:components_dir)}

# Devops commands
namespace :ops do

  desc 'Copy non-git files to servers.'
  task :put_components do
    on roles(:app), in: :sequence, wait: 1 do
      system("tar -zcf /tmp/vendor.tar.gz ./vendor ")
      execute "mkdir -p #{fetch(:components_dir)}"
      upload! '/tmp/vendor.tar.gz', "#{fetch(:components_dir)}", :recursive => true
      execute "cd #{fetch(:components_dir)}
      sudo tar -zxf #{fetch(:components_dir)}/vendor.tar.gz"
      execute "sudo chown www-data -R #{fetch(:components_dir)}"
      execute "sudo chgrp deploy -R #{fetch(:components_dir)}"
      execute "sudo chmod 775 -R #{fetch(:components_dir)}/../"
    end
  end
  
  task :restart_apache do
      on roles(:app), in: :sequence, wait:1 do
        execute "sudo /etc/init.d/apache2 restart"
      end
  end

end
